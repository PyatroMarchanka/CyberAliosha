import { createGlobalStyle } from 'styled-components';

// @ts-ignore
import HelveticaComp from './HelveticaComp.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'HelveticaComp';
        src: local('HelveticaComp') url(${HelveticaComp}) format('ttf');
        font-weight: 300;
        font-style: normal;
    }
`;
