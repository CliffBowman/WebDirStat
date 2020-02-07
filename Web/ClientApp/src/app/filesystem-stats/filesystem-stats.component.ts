import { Component, OnInit } from '@angular/core';
import { TreemapService } from '../treemap/treemap.service';
import { FormControl } from '@angular/forms';
import { ITreemapItem } from '../treemap/treemap-item';

@Component({
  selector: 'app-filesystem-stats',
  templateUrl: './filesystem-stats.component.html',
  styleUrls: ['./filesystem-stats.component.scss']
})
export class FolderStatsComponent implements OnInit {

  public pathControl: FormControl;
  public data: JSON;
  public itemPath: string;
  public itemSize: number;

  constructor(private treemapService: TreemapService) {
  }

  public ngOnInit() {
    this.pathControl = new FormControl('C:\\Program Files');
    this.viewFolders();
  }

  public viewFolders() {
    this.treemapService.getFolderStats(this.pathControl.value).subscribe((response: JSON) => {
      this.data = response;
    }, error => console.error(error));
  }

  public viewFiles() {
    this.treemapService.getFileStats(this.pathControl.value).subscribe((response: JSON) => {
      this.data = response;
    }, error => console.error(error));
  }

  public displayItem(item: ITreemapItem) {
    console.log(item);
    this.itemPath = item.path;
    this.itemSize = item.size;
  }
}
