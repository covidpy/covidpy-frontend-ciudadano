const basePath = process.env.VUE_APP_BASE_HREF;
module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: basePath,
  pwa: {
    name: 'Reporte en Cuarentena PY - COVID-19',
    themeColor: '#001c54',
    background_color: '#35cda4',
    assetsVersion: '1',
    manifestOptions: {
      short_name: 'COVID-19 PY',
      start_url: basePath,
      display: 'fullscreen',
      icons: [
        {
          'src': 'img/icons/android-icon-36x36.png',
          'sizes': '36x36',
          'type': 'image/png',
          'density': '0.75'
        },
        {
          'src': 'img/icons/android-icon-48x48.png',
          'sizes': '48x48',
          'type': 'image/png',
          'density': '1.0'
        },
        {
          'src': 'img/icons/android-icon-72x72.png',
          'sizes': '72x72',
          'type': 'image/png',
          'density': '1.5'
        },
        {
          'src': 'img/icons/android-icon-96x96.png',
          'sizes': '96x96',
          'type': 'image/png',
          'density': '2.0'
        },
        {
          'src': 'img/icons/android-icon-144x144.png',
          'sizes': '144x144',
          'type': 'image/png',
          'density': '3.0'
        },
        {
          'src': 'img/icons/android-icon-192x192.png',
          'sizes': '192x192',
          'type': 'image/png',
          'density': '4.0'
        },
        {
          'src': 'img/icons/icon512.png',
          'sizes': '512x512',
          'type': 'image/png'
        },
      ]
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-icon.png',
      msTileImage: 'img/icons/ms-icon-144x144.png'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    }
  },
  devServer: {
    port: 4200,
    proxy: {
      '^/apicovid': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/apicovid': '/portal-covid-core'
        },
      },
    },
  },
};
