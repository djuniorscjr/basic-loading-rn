import React from 'react';
import {
	StyleSheet,
	View,
	Animated,
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	group: {
		width: 100,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	square: {
		width: 15,
		height: 50,
		margin: 2,
		backgroundColor: '#000',
		borderWidth: 2,
		borderColor: '#000',
	},
});

// @flow

type PropsObjectAnimated = {
	value: Animated.Value,
	colors: Array<string>,
	scales: Array<number>,
};

const ObjectAnimated = ({ value, colors, scales }: PropsObjectAnimated) => (
	<Animated.View
		style={[styles.square, {
			backgroundColor: value.interpolate({
				inputRange: [0, 1, 2],
				outputRange: colors,
			}),
			transform: [{
				scaleY: value.interpolate({
					inputRange: [0, 1, 2],
					outputRange: scales,
				}),
			}],
		}]}
	/>
);

type Props = {
	active: ?boolean;
};

class Square extends React.Component<Props> {
	constructor(props) {
		super(props);
		this.animatedValue = new Animated.Value(0);
	}

	componentWillMount() {
		this.animate();
	}

	setTimingAnimed(originalValue, newValue, duration) {
		return Animated.timing(originalValue, {
			toValue: newValue,
			duration,
		});
	}

	animate() {
		Animated.sequence([
			this.setTimingAnimed(this.animatedValue, 1, 350),
			this.setTimingAnimed(this.animatedValue, 2, 350),
			this.setTimingAnimed(this.animatedValue, 0, 350),
		]).start(() => this.animate());
	}

	render() {
		const { active } = this.props;
		return active ? (
			<View style={styles.container}>
				<View style={styles.group}>
					<ObjectAnimated
						value={this.animatedValue}
						colors={['#eee', '#000', '#000']}
						scales={[1.5, 1, 1]}
					/>
					<ObjectAnimated
						value={this.animatedValue}
						colors={['#000', '#eee', '#000']}
						scales={[1, 1.5, 1]}
					/>
					<ObjectAnimated
						value={this.animatedValue}
						colors={['#000', '#000', '#eee']}
						scales={[1, 1, 1.5]}
					/>
				</View>
			</View>
		) : <React.Fragment />;
	}
}

export default Square;
