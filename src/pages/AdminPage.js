import React from 'react';
import Noty from 'noty';
import fetch from './../mock/FetchMock';

import 'noty/lib/noty.css';
import 'noty/lib/themes/bootstrap-v4.css';

const REQUEST_URL = 'https://url.com/api/';

class AdminPage extends React.Component {
    constructor () {
        super();
        this.state = {
            phone: '',
            apiId: '',
            apiHash: '',
            requestMsg: '',
            approvalMsgs: [],
            approveResponse: '',
            denyResponse: '',
        };
    }

    componentDidMount() {
        this.sendGetConfig().then(r => {
            console.log('Got data successfully!');
            this.setState(r);
        }).catch(err => {
            console.error('Error while getting config: ' + err);
        });
    }

    sendSaveConfigRequest(url, data) {
        return fetch(REQUEST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            return response.json()
        });
    }

    sendGetConfig(url) {
        return fetch(REQUEST_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            return response.json()
        });
    }

    handleSubmit = e => {
        e.preventDefault();


        this.sendSaveConfigRequest('https://url.com', this.state).then(r => {
            this.showNoty('success', 'Settings saved!');
        }).catch(err => {
            this.showNoty('fail', 'Failed saving data: ' + err);
        });
    }

    showNoty(type, text) {
        new Noty({
            theme: 'bootstrap-v4',
            type: type,
            layout: 'topRight',
            text: text,
            timeout: 2000,
            killer: true
        }).show();
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="admin-page">
                <form onSubmit={this.handleSubmit}>
                    <h3>Telegram info</h3>

                    <label className="input-label">Phone</label>
                    <div className="phone-container">
                        <span className="phone-prefix">+36</span>
                        <input type="phone" value={this.state.phone} onChange={this.handleChange} name="phone"/>
                    </div>

                    <label className="input-label">Api ID</label>
                    <input type="text" value={this.state.apiId} onChange={this.handleChange} name="apiId"/>

                    <label className="input-label">API Hash</label>
                    <input type="text" value={this.state.apiHash} onChange={this.handleChange} name="apiHash"/>

                    <h3>Customization</h3>

                    <label className="input-label">Request message</label>
                    <textarea type="text" value={this.state.requestMsg} onChange={this.handleChange} name="requestMsg"/>

                    <label className="input-label">Approval messages</label>
                    <input type="text" value={this.state.approvalMsgs} onChange={() => console.log('list updated')}/>

                    <label className="input-label">Approve response</label>
                    <input type="text" value={this.state.approveResponse} onChange={this.handleChange} name="approveResponse"/>

                    <label className="input-label">Deny response</label>
                    <input type="text" value={this.state.denyResponse} onChange={this.handleChange} name="denyResponse"/>

                    <button type="submit" value="Submit" className="submit-btn">Submit</button>
                </form>
            </div>
        );
    }
}

export default AdminPage;
