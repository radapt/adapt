export default {
  component: {
    type: 'app',
    key: 'app',
    title: 'Test AppA',
    sections: ['header', 'main', 'footer'],
    header: [
      {
        type: 'link',
        key: 'brand',
        class: 'navbar-brand',
        text: 'Test AppB',
        link: '<default>',
        connect: [
          {
            on: 'click',
            state: 'router',
            action: 'navigate',
          },
        ]
      },
      {
        type: 'navigation',
        key: 'nav',
        class: 'mr-auto',
        links: [
          {
            text: 'Page 1',
            key: 'page1',
            path: 'page1',
          },
          {
            text: 'Page 2',
            key: 'page2',
            path: 'page2',
          },
          {
            text: 'Page 3',
            key: 'page3',
            path: 'page3',
          },
        ],
        connect: [
          {
            property: 'page',
            state: 'router',
            page: 'currentPage',
          },
          {
            on: 'click',
            state: 'router',
            action: 'navigate',
          },
        ],
      }
    ],
    main: [
      {
        type: 'pagecontainer',
        key: 'pagenav',
        sections: ['pages'],
        pages: [
          {
            type: 'page',
            title: 'Test Title',
            default: true,
            key: 'page1',
            components: [
              {
                type: 'html',
                value: '<h3>This is a test p1</h3>',
              }
            ],
          },
          {
            type: 'page',
            title: 'Second Page',
            key: 'page2',
            components: [
              {
                type: 'html',
                value: '<h3>This is a test p2</h3>',
              }
            ],
          },
          {
            type: 'page',
            title: 'Third Page',
            key: 'page3',
            components: [
              {
                type: 'html',
                value: '<h3>This is a test p3</h3>',
              }
            ],
          },
        ],
        connect: [
          {
            property: 'page',
            state: 'router',
            page: 'currentPage',
          }
        ],
      },
    ],
    footer: [],
  },
  store: {
    router: {
      type: 'router',
      routes: [
        'test',
        'test/:test',
        'test/:test/foo/:bar',
        'foo',
        'foo/baz',
        'foo/:bar',
        'page1',
        'page2',
        'page3',
      ]
    }
  }
}
