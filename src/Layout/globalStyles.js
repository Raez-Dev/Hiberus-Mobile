import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle `   

    /*Grid Area First Mobile*/

    .container {
        width:85%;
    }

    .layout {

        display: grid;
        
        grid-template-columns:  1fr 1fr 1fr;
        grid-template-rows:     max-content auto max-content;

        grid-template-areas:    "header header  header"
                                "main   main    main"
                                "footer footer  footer";
        height:100vh;
        width:100%;
    }

    .footer-icon {
        margin-right:30px;
        height:25px;
        width:25px,
    }

    .filter-icon{
        height:20px;
        width:20px;
    }


    /*min 768px*/
    @media screen and (min-width: 768px){
        .layout{
            grid-template-areas:    "header header  header"
                                    "main   main    main"
                                    "footer footer  footer";
        }    
    }

    /*min 1024px*/
    @media screen and (min-width: 1024px)   {
        .layout {
            grid-template-areas:    "header header  header"
                                    "main   main    main"
                                    "footer footer  footer";
        }
    }

    /*min 1280px*/
    @media screen and (min-width: 1280px)   {
        .layout {
            grid-template-areas:    "header header  header"
                                    "main   main    main"
                                    "footer footer  footer";
        }
    }
`;

export default GlobalStyle;