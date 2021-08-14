import { Component, OnInit } from '@angular/core';
import { ICircle } from "../interfaces/circle.interface";
import { ECircleCount } from "../enums/circle-count.enum";
import { LocalStorageService } from "../services/storage.service";
import { IProject } from "../interfaces/project.interface";
import { Router } from '@angular/router';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  circles: ICircle[] = [];
  projectName: string = '';
  projectList: IProject[] = [];
  curProjectList: IProject[] = [];
  projectListName = 'circlesProject';
  canvasSizes: number[] = [
    ECircleCount.MIN, // 100
    ECircleCount.MID, // 225
    ECircleCount.MAX, // 400
  ];
  selectedSize: number = this.canvasSizes[0];
  currentSize: number = this.selectedSize;
  currentColor: string = '#000000';

  constructor(private storage: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    this.getProjects();
  }

  onGenerateCircles(): void {
    this.currentSize = this.selectedSize
    this.resetColors()
    console.log('this.circles: ', this.circles);
  }

  onSizeSelect(): void {
    // this.circles = [];
  }

  onCircleClick(circle: ICircle): void {
    let currentCircle = this.circles[circle.id];
    if (currentCircle.color === this.currentColor) {
      currentCircle.color = '#ffffff';
    } else {
      currentCircle.color = this.currentColor;
    }
  }

  onResetColor(): void {
    if (!this.isEmpty(this.circles)) {
      this.resetColors();
    }
  }

  resetColors(): void {
    this.circles = [];
    for (let i = 0; i < this.selectedSize; i++) {
      this.circles.push({
        id: i,
        uid: this.newId(),
        color: '',
      });
    }
  }

  onFillCircles(): void {
    if (this.isEmpty(this.circles)) {
      return;
    }
    this.circles.forEach((item) => {
      item.color = this.currentColor;
    })
  }

  isEmpty(arr: ICircle[]): boolean {
    return !arr.length;
  }

  newId(): string {
    return String(Date.now());
  }

  projectNameExists(): boolean {
    return this.curProjectList.some((proj) => proj.name === this.projectName);
  }

  onSave(): void {
    if(this.projectNameExists()) {
      alert('Can not save a project with existing name')
      return
    }
    if (this.isEmpty(this.circles) || !this.projectName) {
      return;
    }
    this.projectList.push({
      id: this.newId(),
      name: this.projectName,
      circles: this.circles,
      size: this.selectedSize,
      email: this.storage.get('curUser') || ''
    });

    this.curProjectList.push({
      id: this.newId(),
      name: this.projectName,
      circles: this.circles,
      size: this.selectedSize,
      email: this.storage.get('curUser') || ''
    });

    const projectsStr = JSON.stringify(this.projectList);
    this.storage.set(this.projectListName, projectsStr);
  }

  getProjects(): void {
    const projects = this.storage.get(this.projectListName);
    if (projects) {
      this.projectList = JSON.parse(projects);
      const email = this.storage.get('curUser');

      this.projectList.map(el => {
        if(el.email === email) {
          this.curProjectList.push(el);
        }
      })
    }
  }

  selectProject(project: IProject): void {
    this.circles = project.circles;
    this.currentSize = project.size;
  }

  onProjectDelete(project: IProject): void {
    let newProjectList = this.projectList.filter((proj) => project.id !== proj.id);
    this.projectList = newProjectList;

    newProjectList = this.curProjectList.filter((proj) => project.id !== proj.id);
    this.curProjectList = newProjectList;

    const projectsStr = JSON.stringify(this.projectList);
    this.storage.set(this.projectListName, projectsStr);
  }

  onLogout(): void {
    this.storage.remove('curUser');
    this.router.navigate(['']);
  }
}
