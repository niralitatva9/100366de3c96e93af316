import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const TEXT: TextStyle = {
  color: color.palette.black,
  fontSize: 20
}
const HEADER: TextStyle = {
  color: color.palette.black,
  fontSize: 24,
  fontWeight: 'bold'
}

export const PostDetailsScreen = observer(function PostDetailsScreen() {
  // Pull in one of our MST stores
  const { postStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const renderText = (label: string, value: any) => (
    <Text text={`${label} : ${value} `} style={TEXT} />
  )
  return (
    <Screen style={ROOT} preset="scroll">
      <Header headerText={'postDetailsScreen'} leftIcon={'back'} titleStyle={HEADER} onLeftPress={() => navigation.goBack()} />
      {renderText("Title", postStore.postDetails.title)}
      {renderText("Created_at", postStore.postDetails.created_at)}
      {renderText("Author", postStore.postDetails.author)}
      {renderText("url", postStore.postDetails.url)}
      {renderText("points", postStore.postDetails.points)}
      {renderText("story_text", postStore.postDetails.story_text)}
      {renderText("comment_text", postStore.postDetails.comment_text)}
      {renderText("num_comments", postStore.postDetails.num_comments)}
      {renderText("story_id", postStore.postDetails.story_id)}
      {renderText("story_title", postStore.postDetails.story_title)}
      {renderText("story_url", postStore.postDetails.story_url)}
      {renderText("parent_id", postStore.postDetails.parent_id)}
      {renderText("created_at_i", postStore.postDetails.created_at_i)}
      {renderText("objectID", postStore.postDetails.objectID)}
    </Screen>
  )
})
