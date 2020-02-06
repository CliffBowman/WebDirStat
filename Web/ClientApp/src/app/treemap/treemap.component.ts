import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output()
  public itemHover: EventEmitter<ITreemapItem> = new EventEmitter<ITreemapItem>();

  public ngOnChanges(changes: any) {
    if (changes.data && changes.data.currentValue) {
      this.build(changes.data.currentValue);
    }
  }

  public onHoverEnter(d: any) {
    const item: ITreemapItem = {
      path: d.data.name,
      size: d.data.value,
    };
    this.itemHover.emit(item);
  }

  public onHoverExit() {
  }

  private build(data: JSON) {

    d3.selectAll('g').remove();

    var _this = this;
    var root = d3.hierarchy(data);
    var treemapLayout = d3.treemap()
      .size([this.width, this.height]);

    root.sum((d: any) => d.value);
    treemapLayout(root);

    var descendants = root.descendants()
      //.filter(d => d.data.name.indexOf('.vs') != -1)
      //.filter(d => d.value > 1000000)
      ;

    var nodes = d3.select('svg')
      .selectAll('g')
      .data(descendants)
      .enter()
      .append('g')
      .attr('transform', (d: any) => 'translate(' + [d.x0, d.y0] + ')')
      .attr('data-name', (d: any) => {
        return d.data.name;
      })
      .on('click', function (d, i) {
        d3.select(this)
          .selectAll('rect')
          .attr('fill', 'red');

        _this.onHoverEnter(d);
      })
      //.on('mouseout', function (d, i) {
      //  d3.select(this)
      //    .selectAll('rect')
      //    .attr('fill', 'cadetblue');

      //  _this.onHoverExit();
      //})
      .attr('data-value', (d: any) => d.value)
      ;

    nodes
      .append('rect')
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('height', (d: any) => d.y1 - d.y0)
      .attr('fill', 'cadetblue')
      //.attr('stroke', d => 'black')

      ;

    //nodes
    //  .append('text')
    //  .attr('dx', 4)
    //  .attr('dy', 14)
    //  .text(function (d) {
    //    return d.data.name;
    //  })
  }
}
