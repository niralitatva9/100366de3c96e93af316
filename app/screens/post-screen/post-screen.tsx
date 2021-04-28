import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { Screen, Text, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { toJS } from "mobx"
interface postType{
  title:string 
  created_at:string 
  author:string 
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const CONTAINER: ViewStyle = {
  margin: 5,
  backgroundColor: color.palette.lighterGrey
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
export const PostScreen = observer(function PostScreen() {
  // Pull in one of our MST stores
  const { postStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  useEffect(() => {
    postStore.getPost()
    const interval = setInterval(() => {
      postStore.loadMorePost()
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  },[])

  const renderText = (label: string, value: any) => (
    <Text text={`${label} : ${value} `} style={TEXT} />
  )
  const renderItems = ({ item, index }:{item:postType,index:number}) => {
    return (
      <TouchableOpacity style={CONTAINER} onPress={() => {
        postStore.updatePostDetails(item)
        navigation.navigate("postDetails", { item })
      }} >
        {renderText("Title", item.title)}
        {renderText("Created_at", item.created_at)}
        {renderText("Author", item.author)}
      </TouchableOpacity>
    )
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <Header headerText={'Post Screen'} titleStyle={HEADER} />
      <FlatList
        data={toJS(postStore.postList)}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          if (!postStore.isLoading) {
            postStore.loadMorePost()
          }
        }
        }
      />
    </Screen>
  )
})
