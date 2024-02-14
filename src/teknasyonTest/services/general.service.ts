/* eslint-disable no-use-before-define */
import { ServiceEventEmitter } from "../../utils/eventEmitter/event.emitter";

export class GeneralService {
  static instance: GeneralService;
  public static getInstance(): GeneralService {
    if (!GeneralService.instance) {
      GeneralService.instance = new GeneralService();
    }
    return GeneralService.instance;
  }
  private ServiceEventEmitter = ServiceEventEmitter;
}
