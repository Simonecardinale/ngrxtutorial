import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthActions} from './auth.actions';
import {catchError, map, mergeMap, of, tap} from 'rxjs';
import {Router} from '@angular/router';


export const authEffects = createEffect((
  action$ = inject(Actions),
  http = inject(HttpClient)
) => {
  return action$.pipe(
    ofType(AuthActions.login),
    mergeMap((action) => {
      const params = new HttpParams()
        .set('username', action.username)
        .set('password', action.password)
      return http.get<{token: string}>(`http://localhost:3001/login/`, {params})
        .pipe(
          map((res) => AuthActions.loginSuccess({token: res.token})),
          catchError(() => of(AuthActions.loginFail))
        )
    })
  )
}, {functional: true});

// ...
export const loginSuccess = createEffect((
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) => {
    return actions$.pipe(
      // wait the loginSuccess action
      ofType(AuthActions.loginSuccess),
      mergeMap((action) =>
        // get the profile passing the token, that is retrieved by the action payload
        http.get<{ displayName: string}>('http://localhost:3001/profile', {
          headers: {
            Authorization: `Bearer ${action.token}`
          }
        })
          .pipe(
            // dispatch the getProfileSuccess action is success,
            // passing the displayName as payload
            map((res) =>
              AuthActions.getProfileSuccess({ displayName: res.displayName })
            ),
            // dispatch the getProfileFail in case of errors
            catchError(() =>
              of(AuthActions.getProfileFail())
            )
          )
      )
    );
  },
  { functional: true}
);

// ...
export const getProfileSuccess = createEffect((
    actions$ = inject(Actions),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.getProfileSuccess),
      // redirect
      tap(() => {
        router.navigateByUrl('cms')
      })
    );
  },
  // dispatch: false => this effect does not dispatch an action
  { functional: true, dispatch: false}
);
