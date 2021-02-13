import React from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqDeleteImg } from "../../../api";
import { IMGS_URL } from "../../../utils/constants";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class PicturesWall extends React.Component {
  constructor(props) {
    super(props);

    const { product } = props;
    let fileList = [];
    if (product.name) {
      const imgs = product.imgs;
      fileList = imgs.map((item, index) => ({
        uid: -index, // 文档说避免冲突 设成负的 index 机智
        name: item,
        status: "done",
        url: IMGS_URL + item,
      }));
    }
    this.state = {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList, // 初始图片文件列表
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = async ({ file, fileList }) => {
    console.log(file, fileList);
    if (file.status === "done") {
      // 组件上传图片的 name 和 url 在fileList每一项中的 response 里
      const result = file.response;
      if (result.status === 0) {
        message.success("上传图片成功");
        const { name, url } = result.data;
        // 因为file和数组里最后一个元素不是同一个,而最后更新的状态其实是 fileLish,所以,获取到的name和url还是要在 fileList 里面改
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      } else {
        message.error("上传图片失败");
      }
    } else if (file.status === "removed") {
      // 判断商品状态为移除的时候
      const { name } = file;
      // 删除图片
      const result = await reqDeleteImg(name);
      if (result.status === 0) {
        message.success("图片删除成功");
      } else {
        message.error("图片删除失败");
      }
    }

    this.setState({ fileList });
  };
  // 定义获取图片 name 列表的函数,供父组件调用
  getNameList = () => this.state.fileList.map((file) => file.name);
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload" // 上传图片的接口地址
          // 路径不用写全,应为配置了代理
          accept="image/*" // 指定接收文件格式
          listType="picture-card" // 图片展示样式
          name="image" // 默认发送给后台的参数名
          fileList={fileList} // 指定已上传文件的数组
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {/* 判断上传图片长度,是否隐藏 */}
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default PicturesWall;
