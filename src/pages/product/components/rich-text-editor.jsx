import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
/**
 * 用来指定商品详情的 富文本编辑器
 * 首先一个问题,因为空行报错我是真的无法理解
 */
export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    const html = this.props.detail;
    if (html) {
      // 如果父组件传入 detail 说明是更新,所以要创建 带内容的结构放入富文本编辑器
      // 这一长串,这种有点复杂的功能就不要猜了,直接翻文档案例,看看能不能找到(虽说我看是悬啊,都是英文的)
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
          editorState,
        };
      }
    } else {
      this.state = {
        editorState: EditorState.createEmpty(), // 创建一个[没有内容]的编辑对象
      };
    }
  }
  /* 
    输入过程中 实时回调 函数,用于更新绑定状态的 Editor 组件
  */
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  // 获取标签格式数据
  // 返回 html 格式的文本
  getDetail = () =>
    draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
  // 定义图片上传的回调函数
  uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/manage/img/upload");
      // xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve({ data: { link: response.data.url } });
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };
  // 以下为 render 方法渲染结构
  // 看 linus 的双行注释挺好的就随便弄一下看看
  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState} // 状态中创建的 空编辑对象 状态 传入编辑器state属性
        onEditorStateChange={this.onEditorStateChange} // 绑定监听,实时更新状态函数
        // 添加边框样式
        editorStyle={{
          border: "1px solid #000",
          minHeight: 200,
          marginTop: -5,
          padding: 20,
        }}
        toolbar={{
          image: {
            uploadCallback: this.uploadImageCallBack,
            alt: { present: true, mandatory: true },
          },
        }}
      />
    );
  }
}
