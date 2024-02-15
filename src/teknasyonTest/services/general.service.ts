/* eslint-disable no-use-before-define */
import { Albums } from "@/types/album";
import { ServiceEventEmitter } from "../utils/eventEmitter/event.emitter";
import { AlbumPhotos } from "@/types/albumPhotos";
import { PhotoComments } from "../types/photoComments";

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

  private _album: Albums = {} as Albums;
  public get album() {
    return this._album;
  }
  public set album(value) {
    this._album = value;
    this.ServiceEventEmitter.emit("album", value);
  }

  private _albumsPage: number = 1;
  public get albumsPage() {
    return this._albumsPage;
  }
  public set albumsPage(value) {
    this._albumsPage = value;
    this.ServiceEventEmitter.emit("albumsPage", value);
  }

  private _albumPhotos: AlbumPhotos[] = [];
  public get albumPhotos() {
    return this._albumPhotos;
  }
  public set albumPhotos(value) {
    this._albumPhotos = value;
    this.ServiceEventEmitter.emit("albumPhotos", value);
  }

  private _albumPhoto: AlbumPhotos = {} as AlbumPhotos;
  public get albumPhoto() {
    return this._albumPhoto;
  }
  public set albumPhoto(value) {
    this._albumPhoto = value;
    this.ServiceEventEmitter.emit("albumPhoto", value);
  }

  private _albumPhotosPage: number = 1;
  public get albumPhotosPage() {
    return this._albumPhotosPage;
  }
  public set albumPhotosPage(value) {
    this._albumPhotosPage = value;
    this.ServiceEventEmitter.emit("albumPhotosPage", value);
  }

  private _comments: PhotoComments[] = [];
  public get comments() {
    return this._comments;
  }
  public set comments(value) {
    this._comments = value;
    this.ServiceEventEmitter.emit("comments", value);
  }

  private _commentsPage: number = 1;
  public get commentsPage() {
    return this._commentsPage;
  }
  public set commentsPage(value) {
    this._commentsPage = value;
    this.ServiceEventEmitter.emit("commentsPage", value);
  }

  private _albumSearchText: string = "";
  public get albumSearchText() {
    return this._albumSearchText;
  }
  public set albumSearchText(value) {
    this._albumSearchText = value;
    this.ServiceEventEmitter.emit("albumSearchText", value);
  }
}
