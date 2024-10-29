import React, { Component, createRef } from 'react';
import Tree from 'react-d3-tree';
import { withTranslation } from 'react-i18next'; // Import for i18n
import '../styles/FamilyTreeSynium.css'; // Custom styles for tree layout

const containerStyles = {
  width: '100%',
  height: '100vh',
  background: '#f8f9fa', // Synium-like light background
};

const nodeSize = { x: 300, y: 200 }; // Adjust node dimensions for better spacing

class FamilyTreeSynium extends Component {
  constructor(props) {
    super(props);
    this.treeContainer = createRef();
    this.state = {
      data: [],
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

  // Validate members data structure to avoid errors like undefined gender
  validateMembers = (members) =>
    members.map((member) => ({
      ...member,
      gender: member.gender || 'unknown', // Provide default gender if missing
    }));

  // Transform members to a hierarchical data format for rendering
  transformData = (members) => {
    const map = new Map();
    members.forEach((member) =>
      map.set(member._id, { ...member, children: [] })
    );

    const roots = [];

    members.forEach((member) => {
      if (member.parents.length > 0) {
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

  // Custom render function for nodes to apply multilingual name support
  renderCustomNode = ({ nodeDatum, toggleNode }) => {
    const { t, i18n } = this.props; // Get translation and i18n instance
    const genderColor =
      nodeDatum.gender === 'male'
        ? '#ADD8E6' // Light blue
        : nodeDatum.gender === 'female'
        ? '#FFC0CB' // Light pink
        : '#D3D3D3'; // Default gray if gender is unknown

    return (
      <g>
        {/* Node circle */}
        <circle r={20} onClick={toggleNode} fill={genderColor} />
        <text fill="black" strokeWidth="1" x="25">
          {nodeDatum.name[i18n.language]} {/* Use language-specific name */}
        </text>
        {nodeDatum.birthYear && (
          <text fill="gray" x="25" dy="20">
            {`${nodeDatum.birthYear} - ${
              nodeDatum.isAlive ? t('present') : nodeDatum.deathYear || ''
            }`}
          </text>
        )}
      </g>
    );
  };

  render() {
    const { data } = this.state;

    if (!data.length) {
      console.error('Data is undefined or empty');
      return <div>{this.props.t('loading_message')}</div>;
    }

    return (
      <div style={containerStyles} ref={this.treeContainer}>
        <Tree
          data={data}
          orientation="vertical"
          translate={{ x: 500, y: 100 }}
          pathFunc="elbow" // Use elbow links for curves
          nodeSize={nodeSize}
          separation={{ siblings: 1, nonSiblings: 2 }}
          zoomable
          renderCustomNodeElement={(rd3tProps) =>
            this.renderCustomNode(rd3tProps)
          }
        />
      </div>
    );
  }
}

export default withTranslation()(FamilyTreeSynium);


// import React, { Component, createRef } from 'react';
// import Tree from 'react-d3-tree';
// import '../styles/FamilyTreeSynium.css'; // Custom styles for the tree layout.

// const containerStyles = {
//   width: '100%',
//   height: '100vh',
//   background: '#f8f9fa', // Synium-like light background
// };

// const nodeSize = { x: 300, y: 200 }; // Adjust node dimensions for better spacing.

// class FamilyTreeSynium extends Component {
//   constructor(props) {
//     super(props);
//     this.treeContainer = createRef();
//     this.state = {
//       data: [],
//     };
//   }

//   componentDidMount() {
//     this.setState({ data: this.transformData(this.props.members) });
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.members !== this.props.members) {
//       this.setState({ data: this.transformData(this.props.members) });
//     }
//   }

//   // Transform members to hierarchical data format
//   transformData = (members) => {
//     const map = new Map();
//     members.forEach((member) =>
//       map.set(member._id, { ...member, children: [] })
//     );

//     const roots = [];

//     members.forEach((member) => {
//       if (member.parents.length > 0) {
//         member.parents.forEach((parentId) => {
//           const parent = map.get(parentId);
//           if (parent) {
//             parent.children.push(map.get(member._id));
//           }
//         });
//       } else {
//         roots.push(map.get(member._id));
//       }
//     });

//     return roots;
//   };

//   renderCustomNode = ({ nodeDatum, toggleNode }) => (
//     <g>
//       <circle r={20} onClick={toggleNode} />
//       <text fill="black" strokeWidth="1" x="25">
//         {nodeDatum.name}
//       </text>
//       {nodeDatum.birthYear && (
//         <text fill="gray" x="25" dy="20">
//           {`${nodeDatum.birthYear} - ${nodeDatum.isAlive ? 'Present' : nodeDatum.deathYear}`}
//         </text>
//       )}
//     </g>
//   );

//   render() {
//     const { data } = this.state;

//     if (!data.length) {
//       console.error("Data is undefined or empty");
//       return <div>Data is undefined or empty</div>;
//     }

//     return (
//       <div style={containerStyles} ref={this.treeContainer}>
//         <Tree
//           data={data}
//           orientation="vertical"
//           translate={{ x: 500, y: 100 }}
//           pathFunc="elbow" // Use elbow links for curves.
//           nodeSize={nodeSize}
//           separation={{ siblings: 1, nonSiblings: 2 }}
//           zoomable
//           renderCustomNodeElement={(rd3tProps) => this.renderCustomNode(rd3tProps)}
//         />
//       </div>
//     );
//   }
// }

// export default FamilyTreeSynium;

// const FamilyTreeSynium = ({ members }) => {
//   const treeContainer = useRef(null);
//   const [data, setData] = useState([]);

//   // Transform members to hierarchical data format
//   const transformData = (members) => {
//     const map = new Map();
//     members.forEach((member) =>
//       map.set(member._id, { ...member, children: [] })
//     );

//     const roots = [];

//     members.forEach((member) => {
//       if (member.parents.length > 0) {
//         member.parents.forEach((parentId) => {
//           const parent = map.get(parentId);
//           if (parent) {
//             parent.children.push(map.get(member._id));
//           }
//         });
//       } else {
//         roots.push(map.get(member._id));
//       }
//     });

//     return roots;
//   };

//   useEffect(() => {
//     setData(transformData(members));
//   }, [members]);

//   return (
//     <div style={containerStyles} ref={treeContainer}>
//       <Tree
//         data={data}
//         orientation="vertical"
//         translate={{ x: 500, y: 100 }}
//         pathFunc="elbow" // Use elbow links for curves.
//         nodeSize={nodeSize}
//         separation={{ siblings: 1, nonSiblings: 2 }}
//         zoomable
//         renderCustomNodeElement={(rd3tProps) => renderCustomNode(rd3tProps)}
//       />
//     </div>
//   );
// };

// // Custom render function for each node to apply dynamic styles and structure.
// const renderCustomNode = ({ nodeDatum, toggleNode }) => (
//   <g>
//     {/* Node circle */}
//     <circle r={20} onClick={toggleNode} fill={nodeDatum.gender === 'male' ? '#ADD8E6' : '#FFC0CB'} />
//     <text fill="black" x={30} dy="-10">
//       {nodeDatum.name}
//     </text>
//     <text fill="gray" x={30} dy="10">
//       {`${nodeDatum.birthYear || ''} - ${nodeDatum.isAlive ? 'Present' : nodeDatum.deathYear || ''}`}
//     </text>
//   </g>
// );

// export default FamilyTreeSynium;