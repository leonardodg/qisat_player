import * as $ from 'jquery';
import * as lightbox from 'lightbox2';
import QiSatPlayer from './Player';

declare global {
    namespace QiSat {
        export type Player = QiSatPlayer;
        export const Player: typeof QiSatPlayer;
    }
}

(<any>window).QiSat = { Player: QiSatPlayer };
(<any>window).$ = (<any>window).jQuery = $;
(<any>window).lightbox = lightbox;