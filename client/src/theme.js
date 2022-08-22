// import { origTheme, extendTheme } from '@chakra-ui/react';

// const theme = extendTheme({
//   components: {
//     Alert: {
//       variants: {
//         subtle: (props) => {
//           // only applies to `subtle` variant
//           const { colorScheme: c } = props;
//           if (c !== 'blue') {
//             // use original definition for all color schemes except "blue"
//             return origTheme.components.Alert.variants.subtle(props);
//           }
//           return {
//             container: {
//               bg: `teal`, // or literal color, e.g. "#0984ff"
//             },
//           };
//         },
//       },
//     },
//   },
// });

// export default theme;
