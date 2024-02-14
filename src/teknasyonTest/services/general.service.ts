/* eslint-disable no-use-before-define */
import { Albums } from "@/types/album";
import { ServiceEventEmitter } from "../utils/eventEmitter/event.emitter";

export class GeneralService {
  static instance: GeneralService;
  public static getInstance(): GeneralService {
    if (!GeneralService.instance) {
      GeneralService.instance = new GeneralService();
    }
    return GeneralService.instance;
  }
  private ServiceEventEmitter = ServiceEventEmitter;

  private _albumsList: Albums[] = [];
  public get albumsList() {
    return this._albumsList;
  }
  public set albumsList(value) {
    this._albumsList = value;
    this.ServiceEventEmitter.emit("albumsList", value);
  }

  private _albumsPage: number = 1;
  public get albumsPage() {
    return this._albumsPage;
  }
  public set albumsPage(value) {
    this._albumsPage = value;
    this.ServiceEventEmitter.emit("albumsPage", value);
  }
}
