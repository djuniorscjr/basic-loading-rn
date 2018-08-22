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
	circle: {
		height: 15,
		width: 15,
		margin: 5,
		backgroundColor: '#ffcb65',
		borderRadius: 15,
		borderWidth: 5,
		borderColor: '#ffcb65',
	},
});

// @flow

type PropsObjectAnimated = {
	value: Animated.Value,
	sizes: Array<number>,
};

const ObjectAnimated = ({ value, sizes }: PropsObjectAnimated) => (
	<Animated.View
		style={[
			styles.circle, {
				transform: [{
					scale: value.interpolate({
						inputRange: [0, 1, 2],
						outputRange: sizes,
					}),
				}],
			}]}
	/>
);

type Props = {
	active: ?boolean;
};

class Circle extends React.Component<Props> {
	constructor(props) {
		super(props);
		this.animatedValue = new Animated.Value(0);
	}

	componentWillMount() {
		this.animate();
	}

	setTimingAnimated(originalValue, newValue, duration) {
		return Animated.timing(originalValue, {
			toValue: newValue,
			duration,
			useNativeDriver: true,
		});
	}

	animate() {
		Animated.sequence([
			this.setTimingAnimated(this.animatedValue, 1, 350),
			this.setTimingAnimated(this.animatedValue, 2, 350),
			this.setTimingAnimated(this.animatedValue, 0, 350),
		]).start(() => this.animate());
	}

	render() {
		const { active } = this.props;
		return active ? (
			<View style={styles.container}>
				<View style={styles.group}>
					<ObjectAnimated
						value={this.animatedValue}
						sizes={[1.5, 1, 1]}
					/>
					<ObjectAnimated
						value={this.animatedValue}
						sizes={[1, 1.5, 1]}
					/>
					<ObjectAnimated
						value={this.animatedValue}
						sizes={[1, 1, 1.5]}
					/>
				</View>
			</View>
		) : <React.Fragment />;
	}
}

export default Circle;
