import * as Auth from 'components/auth/Auth.reducer';
import * as Folders from "components/personalLibrary/folder/folders/Folders.reducer";
import * as VideoWatch from "components/videoWatch/VideoWatch.reducer";
import * as Videos from "components/personalLibrary/videos/Videos.reducer";
import * as VideoLinks from "components/videoWatch/VideoLinks.reducer";

// The top-level state object
export interface ApplicationState {
    auth: Auth.AuthState | undefined,
    folders: Folders.FoldersState | undefined,
    videoWatch: VideoWatch.VideoWatchState | undefined,
    videos: Videos.VideosState | undefined,
    videoLinks: VideoLinks.VideoLinksState | undefined;
}

export const reducers = {
    auth: Auth.reducer,
    folders: Folders.reducer,
    videoWatch: VideoWatch.reducer,
    videos: Videos.reducer,
    videoLinks: VideoLinks.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
