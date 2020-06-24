import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageUploader from 'react-images-upload';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pictures: []
        };
    }

    onDrop=(pictureFiles, pictureDataURLs) =>{
        this.setState({
          pictures: this.state.pictures.concat(pictureFiles)
        });
      }
    getAuth = () => {
        if (this.props.proxy === 'qwerty') {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div>
                {
                    this.getAuth() ? <div>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            withPreview={true}
                        />
                    </div> : <div>INVALID REQUEST</div>
                }
            </div>
        );
    }
}