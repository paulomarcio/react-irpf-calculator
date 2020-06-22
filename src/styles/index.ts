import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #F0F2F5 ;
    -webkit-font-smoothing: antialiased
  }

  body, input, button {
    font: 16px "Poppins", sans-serif;
  }

  button {
    cursor: pointer;
  }

  section {
    margin: 20px auto;
    max-width: 700px;
  }

  .section-header {
    text-align: center;
    padding: 10px 10px;
    border-radius: 5px;
    background: #666;
    color: #fff;
  }

  .section-body {
    padding: 10px 10px;
    margin-top: 30px;
  }

  .section-body div {
    margin: 5px 0;
  }

  .section-body div p {
    padding: 5px 5px;
  }

  .section-body label {
    display: inline-block;
    text-align: right;
    width: 20%;
    padding: 5px 10px;
  }

  .section-body input {
    border: 1px solid #666;
    width: 80%;
    height: 25px;
  }

  .section-footer {
    text-align: center;
  }

  .section-footer button {
    border-radius: 5px;
    background: #666;
    color: #fff;
    width: 120px;
    padding: 10px;
  }
`;
