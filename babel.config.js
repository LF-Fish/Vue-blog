module.exports = {
  presets: [
    ['@vue/app', {
      'targets': {
        'browsers': ['ie >= 9',"safari >= 7"]
      },
      'loose': true,
      'debug': false,
      useBuiltIns: 'entry',
      polyfills: [
        'es6.promise',
        'es6.symbol'
      ]
    }]
  ],
  plugins:[
    [
      "component",
      {
        "libraryName":"element-ui",
        "styleLibraryName":"theme-chalk"
      }
    ]
  ]
}
