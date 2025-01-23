import { render } from '@testing-library/react-native';

import LabelCategory from '@/components/search/LabelCategory';

jest.mock("expo-font");

describe('<LabelCategory />', () => {
    test('LabelCategory renders correctly', () => {
        const tree = render(<LabelCategory item={{ name: "Plastic", id: "plastic" }} />);
        expect(tree).toMatchSnapshot();
    })
})