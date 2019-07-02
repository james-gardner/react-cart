import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

console.log('ere')
Enzyme.configure({ adapter: new Adapter() });