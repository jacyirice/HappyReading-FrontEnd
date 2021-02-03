import LoadingPageHtml from '../asserts/index.html';
import Footer from './Footer';
import React from 'react';
const template = { __html: LoadingPageHtml };

// React.module.exports = React.createClass({
//   render: function() {
//     return(
//       <div dangerouslySetInnerHTML={template} />
//     );
//   }
// });
function LoadingPage() {
    return (
        <div dangerouslySetInnerHTML={template} />
    );
}

export default LoadingPage;
