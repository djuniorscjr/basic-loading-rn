import React from 'react';

import { Loading } from './components';

// @flow

type Props = {};

const App = (): Props => (
	<React.Fragment>
		<Loading.Square active />
		<Loading.Circle active />
		<Loading.Quadrilateral active />
		<Loading.Diamond active />
	</React.Fragment>
);

export default App;
