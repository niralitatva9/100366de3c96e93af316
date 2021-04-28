import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { Api } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const PostStoreModel = types
  .model("PostStore")
  .props({
    isLoading: types.optional(types.boolean, false),
    pageNo: types.optional(types.number, 0),
    postList: types.frozen(),
    postDetails: types.frozen()
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    getPost: flow(function* getPost() {
      try {
        self.isLoading = true
        let response = yield api.getPost(`${self.pageNo}`)
        if (response.kind == 'ok') {
          self.postList = response.posts.hits
          self.isLoading = false
        } else {
          self.isLoading = false
        }
      } catch (error) {

      }
    }),
    loadMorePost: flow(function* loadMorePost() {
      try {
        self.isLoading = true
        self.pageNo = self.pageNo + 1
        const data = yield api.getPost(`${self.pageNo}`)
        const list = [...self.postList, ...data.posts.hits]
        self.postList = list
        self.isLoading = false
      } catch (error) {

      }
    }),
    updatePostDetails(value) {
      self.postDetails = value
    }

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type PostStoreType = Instance<typeof PostStoreModel>
export interface PostStore extends PostStoreType { }
type PostStoreSnapshotType = SnapshotOut<typeof PostStoreModel>
export interface PostStoreSnapshot extends PostStoreSnapshotType { }
