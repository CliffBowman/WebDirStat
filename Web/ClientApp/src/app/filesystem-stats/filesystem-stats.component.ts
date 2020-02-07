import { Component, OnInit } from '@angular/core';
import { TreemapService, IDriveInfo } from '../treemap/treemap.service';
import { FormControl } from '@angular/forms';
import { ITreemapItem } from '../treemap/treemap-item';
import { LeftNavService } from '../left-nav/left-nav.service';

@Component({
  selector: 'app-filesystem-stats',
  templateUrl: './filesystem-stats.component.html',
  styleUrls: ['./filesystem-stats.component.scss']
})
export class FolderStatsComponent implements OnInit {

  public data: JSON;
  public itemPath: string;
  public itemSize: number;

  constructor(private leftNavService: LeftNavService) {
  }

  public ngOnInit() {
  }

  public displayItem(item: ITreemapItem) {
    console.log(item);
    this.itemPath = item.path;
    this.itemSize = item.size;
  }
}
