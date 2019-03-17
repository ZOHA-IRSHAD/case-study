import { Component, OnInit } from '@angular/core';
import { JobService } from './services/job.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'case-study';
  urlForJob = "https://api.myjson.com/bins/kez8a";
  jobs = [];
  filteredJobs = [];
  private _searchText: string;
  private _searchTerm: string;
  private _dropValue: string;
  private _sortValue: any;
  count: number = 0;
  experience = [];


  constructor(private _service: JobService) { }

  ngOnInit() {
//get the data
    this._service.getData(this.urlForJob)
      .subscribe(jobDetails => {
        this.jobs = jobDetails.jobsfeed;
        this.filteredJobs = this.jobs;
        for (let i = 0; i < this.jobs.length; i++) {
          if (this.jobs[i].experience != "") {
            if (this.experience.indexOf(this.jobs[i].experience) === -1) {
              this.experience.push(this.jobs[i].experience);
            }
          }
        }
      })
  }

  get seacrhText(): string {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
    this.filteredJobs = this.filterJobsBySkills(value);
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredJobs = this.filterJobsByLocation(value);
  }


  selectChangeHandler(event: any) {
    this._dropValue = event.target.value;
    this.filteredJobs = this.filterJobsByExperience(event.target.value);
  }

  ////filter - skills
  filterJobsBySkills(searchString: string) {
    return this.jobs.filter(job =>
      job.skills.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  //filter - location
  filterJobsByLocation(searchString: string) {
    return this.jobs.filter(job =>
      job.location.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  //filter - experience
  filterJobsByExperience(searchString: string) {
    return this.jobs.filter(job =>
      job.experience.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  //Sorting
  sort(field: string) {
    console.log(field)
    this.count++;
    if (this.count % 2 != 0) {
      this._sortValue = -1;
    }
    else if (this.count % 2 == 0) {
      this._sortValue = 1;

    }
    this.jobs.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return 1 * this._sortValue;
      } else if (a[field] > b[field]) {
        return -1 * this._sortValue;
      } else {
        return 0;
      }
    });
    this.filteredJobs = this.jobs;
  }


}
