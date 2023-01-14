// import type { PluginOption } from 'vite'
// import viteImagemin from 'vite-plugin-imagemin'

// /**
//  * CDN对象映射
//  */
// export const imgMinPlugin = (): PluginOption => {
//   return viteImagemin({
//     gifsicle: {
//       optimizationLevel: 7,
//       interlaced: false
//     },
//     optipng: {
//       optimizationLevel: 7
//     },
//     mozjpeg: {
//       quality: 20
//     },
//     pngquant: {
//       quality: [0.8, 0.9],
//       speed: 4
//     },
//     svgo: {
//       plugins: [
//         {
//           name: 'removeViewBox'
//         },
//         {
//           name: 'removeEmptyAttrs',
//           active: false
//         }
//       ]
//     }
//   })
// }