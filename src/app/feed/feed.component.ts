import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit {
  posts: Array<Object>;
  postsReduced: Array<Object>;
  page: number;
  allPages: number;

  constructor(private data: DataService) {
    this.page = 1;
  }

  ngOnInit() {
    this.data.getPosts(this.page).subscribe((data: any) => {
      this.posts = data.result;
      this.allPages = data._meta.pageCount;
    });
  }

  limitPostBody = (title, limit = 255) => {
    const newTitle = [];
    if (title.length > limit) {
      title.split(" ").reduce((acc, curr) => {
        if (acc + curr.length <= limit) {
          newTitle.push(curr);
        }
        return acc + curr.length;
      }, 0);

      return `${newTitle.join(" ")}...`;
    }
    return title;
  };

  loadMore() {
    this.page++;
    this.data.getPosts(this.page).subscribe((data: any) => {
      this.posts = [...this.posts,...data.result];
      this.allPages = data._meta.pageCount;
    });
  }
}
