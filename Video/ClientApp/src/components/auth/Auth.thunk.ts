import {httpClient} from "api/HttpClient";
import {IHttpClientRequestParameters} from "api/IHttpClients";
import {User} from "models/UserInfo";
import {AppThunkAction} from "store";
import {KnownAction, KnownActionType} from "./Auth.actions";
import {AuthPaths} from "./Auth.paths";
import {history} from '../../index';
import {SignInModel} from "./signIn/SignIn.model";
import {SignUpModel} from "./signUp/SignUp.model";
import {NotificationConstants} from "constants/Notification.constants";
import {notificationService, NotificationType} from "services/Notification.service";

export const actionCreators = {
    handleMicrosoftAuth: (accessToken: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.auth && !appState.auth.userInfo) {
            const userInfo = await httpClient.post<any, User>({
                url: AuthPaths.microsoftAuth,
                payload: {
                    accessToken
                }
            } as IHttpClientRequestParameters<any>);
            dispatch({type: KnownActionType.SetUserInfo, payload: userInfo});
            history.push('/');
        }
    },
    handleGoogleAuth: (tokenId: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        try {
            const appState = getState();
            if (appState && appState.auth && !appState.auth.userInfo) {
                const userInfo = await httpClient.post<any, User>({
                    url: AuthPaths.googleAuth,
                    payload: {
                        tokenId
                    }
                } as IHttpClientRequestParameters<any>);
                dispatch({type: KnownActionType.SetUserInfo, payload: userInfo});
                history.push('/');
            }
        } catch (e) {
        }
    },
    signIn: (model: SignInModel): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        try {
            const appState = getState();
            if (appState && appState.auth && !appState.auth.userInfo) {
                const userInfo = await httpClient.post<SignInModel, User>({
                    url: AuthPaths.signIn,
                    payload: model
                } as IHttpClientRequestParameters<SignInModel>);
                dispatch({type: KnownActionType.SetUserInfo, payload: userInfo});
                history.push('/');
            }
        } catch (e) {
        }
    },
    signUp: (model: SignUpModel): AppThunkAction<KnownAction> => async (_, getState) => {
        try {
            const appState = getState();
            if (appState && appState.auth && !appState.auth.userInfo) {
                await httpClient.post<SignUpModel, void>({
                    url: AuthPaths.signUp,
                    payload: model
                } as IHttpClientRequestParameters<any>);
                history.push('/signIn');
                notificationService.send(NotificationType.success, NotificationConstants.emailActivation);
            }
        } catch (e) {
        }

    },
    activateUser: (token: string): AppThunkAction<KnownAction> => async (dispatch, _) => {
        try {
            await httpClient.post<void, void>({
                url: AuthPaths.activateUser(token),
            } as IHttpClientRequestParameters<any>);
            history.push('/signIn');
            notificationService.send(NotificationType.success, NotificationConstants.successUserActivation);
        } catch (ex) {
            history.push('/signIn');
        }
    },

    updateUserProfile: (model: FormData): AppThunkAction<KnownAction> => async (dispatch, _) => {
        try {
            const updatedUser = await httpClient.put<void, User>({url: AuthPaths.updateUser, payload: model} as IHttpClientRequestParameters<any>,);
            dispatch({type: KnownActionType.UpdateUserInfo, payload: updatedUser});
        } catch (ex) {
            history.push('/signIn');
        }
    }
};