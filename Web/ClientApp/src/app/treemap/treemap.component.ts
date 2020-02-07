import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import * as d3 from 'd3';
import { ITreemapItem } from './treemap-item';

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

    d3.selectAll('g').remove();

    var _this = this;
    var root = d3.hierarchy(data);
    var treemapLayout = d3.treemap()
      .size([this.width, this.height]);

    root.sum((node: any) => node.value);
    treemapLayout(root);

    var nodes = d3.select('svg')
      .selectAll('g')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('transform', (node: any) => `translate(${[node.x0, node.y0]})`)
      .attr('data-name', (node: any) => node.data.name)
      .on('click', function (node: any) {
        d3.select(this)
          .selectAll('rect')
          .attr('fill', _this.selectedColor);
        _this.onClick(node);
      })
      .attr('data-value', (node: any) => node.value)
      ;

    nodes
      .append('rect')
      .attr('width', (node: any) => node.x1 - node.x0)
      .attr('height', (node: any) => node.y1 - node.y0)
      .attr('fill', this.fillColor)
      ;
  }
}
