import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { ITreemapItem } from './treemap-item';
import { HierarchyRectangularNode } from 'd3';

interface IHierarchyLeafNode {
  name: string;
  value: number;
}

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreemapComponent implements OnChanges {

  @Input()
  public height: number = 600;

  @Input()
  public width: number = 800;

  @Input()
  public data: JSON;

  @Input()
  public fillColor: string = 'cadetblue';

  @Input()
  public selectedColor: string = 'red';

  @Output()
  public itemClick: EventEmitter<ITreemapItem> = new EventEmitter<ITreemapItem>();

  @ViewChild('canvasContainer')
  public canvasContainer: ElementRef;

  public ngOnChanges(changes: any) {
    if (changes.data && changes.data.currentValue) {
      this.build(changes.data.currentValue);
    }
  }

  private onClick(node: any) {
    const item: ITreemapItem = {
      path: node.data.name,
      size: node.data.value,
    };
    this.itemClick.emit(item);
  }

  private build(data: JSON) {

    d3.select(this.canvasContainer.nativeElement).select('canvas').remove();

    let _this = this;
    let root = d3.hierarchy(data);
    let treemapLayout = d3.treemap()
      .size([this.width, this.height]);

    root.sum((node: any) => node.value);
    treemapLayout(root);

    //Create the canvas and context
    let canvas = d3.select(this.canvasContainer.nativeElement)
      .append("canvas")
      .attr("id", "canvas")
      .attr("width", this.width)
      .attr("height", this.height);

    let context = canvas.node().getContext("2d");
    context.clearRect(0, 0, this.width, this.height);

    let dataset = root.descendants()
      .slice(1)
      .filter(d => d.value > 100000)
      ;

    //Select our dummy nodes and draw the data to canvas.
    dataset.forEach(function (d: any) {

      let node = d3.select(this);
      let colorValue = (d.value * 10) / root.value;
      let width = d.x1 - d.x0;
      let height = d.y1 - d.y0;

      context.fillStyle = d3.interpolateGreys(colorValue);
      context.fillRect(d.x0, d.y0, width, height);
      context.strokeRect(d.x0, d.y0, width, height);

    });

    canvas.on("click", function () {

      let xy = d3.mouse(this);
      let x = xy[0];
      let y = xy[1];
      let item: HierarchyRectangularNode<IHierarchyLeafNode> = <HierarchyRectangularNode<any>>dataset
        .find((d: HierarchyRectangularNode<any>) => x > d.x0 && x < d.x1 && y > d.y0 && y < d.y1 && d.data.value);

      _this.onClick(item);

    });
  }
}
