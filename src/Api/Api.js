import People from "./People";
import Posts from "./Posts";


class myApi {
    constructor() {
        this.people = new People()
        this.posts = new Posts()
    }
}

const Api = new myApi();
export default Api;