import { shallowMount } from '@vue/test-utils';
import GameCharacter from '@client/components/game/Character.vue';

describe('GameCharacter.vue', () => {
	it('renders the component', () => {
		// arrange
		const wrapper = shallowMount(GameCharacter);

		// assert
		expect(wrapper.text()).toContain('Game Character Screen');
	});
});
