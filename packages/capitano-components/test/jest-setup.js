import * as emotion from "emotion";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createSerializer } from "jest-emotion";

configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer(emotion));
