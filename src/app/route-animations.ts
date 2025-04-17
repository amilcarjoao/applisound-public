
import {
  trigger,
  transition,
  style,
  query,
  animate,
  group
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        opacity: 0,
        transform: 'scale(0.95) translateY(10px)'
      })
    ], { optional: true }),
    query(':enter', [
      style({
        opacity: 0,
        transform: 'scale(0.95) translateY(10px)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', 
          style({
            opacity: 0,
            transform: 'scale(0.95) translateY(10px)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        animate('400ms ease-out', 
          style({
            opacity: 1,
            transform: 'scale(1) translateY(0)'
          })
        )
      ], { optional: true })
    ])
  ])
]);
