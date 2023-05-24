import {
  trigger, state, style, transition,
  animate, group, query, stagger, keyframes, sequence
} from '@angular/animations';

export const HomeAnimation = [
  trigger('slideDown', [
    state('up', style({
      'bottom': '50%',
    })),
    state('down', style({
      'bottom': '110px',
    })),
    transition('up => down', [group([
          animate('300ms ease-in', style({
            'bottom': '110px'
          })),
        ]
      )]
    )
  ]),
  trigger('slideDownAndFade', [
    state('inactive', style({
      'top': '-50px',
      'opacity': 1
    })),
    state('active', style({
      'top': '20px',
      'opacity': 0
    })),
    transition('inactive => active', [
        animate('500ms ease-in'),
        animate(1500, style({opacity: 1, top: '20px'})),
        animate(1000),
      ]
    )
  ]),
  trigger('fade', [
    state('void', style({opacity: 0})),
    transition(':enter, :leave', [
      animate(800)
    ]),
  ]),
  trigger('halfFade', [
    state('void', style({opacity: 0.5})),
    transition(':leave', [
      animate(1000)
    ]),
    transition(':enter', [
      animate(1000)
    ]),
  ]),
  trigger('flipState', [
    transition('* => *', animate('2s 0s ease-out',
      keyframes([
        style({
          transform: 'perspective(400px) rotateY(0deg)',
          offset: 0
        }),
        style({
          transform: 'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(80deg)',
          offset: 0.2
        }),
        style({
          transform: 'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(100deg)',
          offset: 0.35
        }),
        style({
          transform: 'perspective(400px) scale3d(1, 1, 1) rotateY(180deg)',
          offset: 0.5,
        }),
        style({
          transform: 'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(100deg)',
          offset: 0.65
        }),
        style({
          transform: 'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(80deg)',
          offset: 0.8,
        }),
        style({
          transform: 'perspective(400px) rotateY(0deg)',
          offset: 1,
        }),
      ])))
  ]),
];

export const slider =
  trigger('routeAnimations', [
    transition('* => isLeft', slideTo('left')),
    transition('* => isRight', slideTo('right')),
    transition('isRight => *', slideTo('left')),
    transition('isLeft => *', slideTo('right'))
  ]);

function slideTo(direction: string) {
  const optional = {optional: true};
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        display: 'block',
        [direction]: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      })
    ], optional),
    query(':enter', [
      style({[direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({[direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({[direction]: '0%'}))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}
