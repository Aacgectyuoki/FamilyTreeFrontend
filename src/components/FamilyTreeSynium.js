import React, { Component, createRef } from 'react';
import Tree from 'react-d3-tree';
import { withTranslation } from 'react-i18next';
import '../styles/FamilyTreeSynium.css';

const containerStyles = {
  width: '100%',
  height: '100vh',
  background: '#f8f9fa',
};

const nodeSize = { x: 300, y: 200 };

class FamilyTreeSynium extends Component {
  constructor(props) {
    super(props);
    this.treeContainer = createRef();
    this.state = {
      data: [],
      expandedNodes: {}, // Track which nodes are expanded to show children
    };
  }

  componentDidMount() {
    const validatedMembers = this.validateMembers(this.props.members);
    this.setState({ data: this.transformData(validatedMembers) });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.members !== this.props.members) {
      const validatedMembers = this.validateMembers(this.props.members);
      this.setState({ data: this.transformData(validatedMembers) });
    }
  }

  validateMembers = (members) =>
    members.map((member) => ({
      ...member,
      gender: member.gender || 'unknown',
    }));

  transformData = (members) => {
    const map = new Map();
    members.forEach((member) =>
      map.set(member._id, { ...member, children: [] })
    );

    const roots = [];
    members.forEach((member) => {
      if (member.parents && member.parents.length > 0) {
        member.parents.forEach((parentId) => {
          const parent = map.get(parentId);
          if (parent) {
            parent.children.push(map.get(member._id));
          }
        });
      } else {
        roots.push(map.get(member._id));
      }
    });

    return roots;
  };

  toggleChildren = (nodeId) => {
    this.setState((prevState) => ({
      expandedNodes: {
        ...prevState.expandedNodes,
        [nodeId]: !prevState.expandedNodes[nodeId],
      },
    }));
  };

  renderCustomNode = ({ nodeDatum, toggleNode }) => {
    const { t, i18n } = this.props;
    const genderColor =
      nodeDatum.gender === 'male' ? '#ADD8E6' : nodeDatum.gender === 'female' ? '#FFC0CB' : '#D3D3D3';

    return (
      <g>
        <circle r={20} onClick={() => this.toggleChildren(nodeDatum._id)} fill={genderColor} />
        <text fill="black" strokeWidth="1" x="25">
          {nodeDatum.name[i18n.language]}
        </text>
        {nodeDatum.birthYear && (
          <text fill="gray" x="25" dy="20">
            {`${nodeDatum.birthYear} - ${nodeDatum.isAlive ? t('present') : nodeDatum.deathYear || ''}`}
          </text>
        )}
        {nodeDatum.spouses && nodeDatum.spouses.length > 0 && (
          <text fill="black" x="25" dy="40">
            {t('spouse')}: {nodeDatum.spouses.map((id) => this.props.members.find((m) => m._id === id).name[i18n.language]).join(', ')}
          </text>
        )}
      </g>
    );
  };

  render() {
    const { data } = this.state;

    if (!data.length) {
      return <div>{this.props.t('loading_message')}</div>;
    }

    return (
      <div style={containerStyles} ref={this.treeContainer}>
        <Tree
          data={data}
          orientation="vertical"
          translate={{ x: 500, y: 100 }}
          pathFunc="elbow"
          nodeSize={nodeSize}
          separation={{ siblings: 1, nonSiblings: 2 }}
          zoomable
          renderCustomNodeElement={(rd3tProps) => this.renderCustomNode(rd3tProps)}
        />
      </div>
    );
  }
}

export default withTranslation()(FamilyTreeSynium);
