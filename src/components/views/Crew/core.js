import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Immutable from "immutable";

const INTERNAL_SUB = gql`
  subscription CrewUpdate($id: ID) {
    crewUpdate(simulatorId: $id) {
      id
      firstName
      lastName
      position
      age
      rank
      gender
    }
  }
`;

class CrewCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false
    };
    this.sub = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: INTERNAL_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ crew: subscriptionData.data.crewUpdate })
            .toJS();
        }
      });
    }
  }
  _importCrew = evt => {
    const self = this;
    const simulatorId = this.props.simulator.id;
    const files = evt.target.files;
    const reader = new FileReader();
    reader.onload = function() {
      const csv = this.result.split("\n");
      if (csv[0] !== "firstName,lastName,gender,age,rank,position") {
        alert("Invalid CSV file.");
        return;
      }
      const crew = csv.slice(1).map(c => {
        const obj = c.split(",");
        return {
          simulatorId,
          firstName: obj[0],
          lastName: obj[1],
          gender: obj[2],
          age: parseInt(obj[3], 10),
          rank: obj[4],
          position: obj[5]
        };
      });
      const mutation = gql`
        mutation AddCrew($crew: CrewInput) {
          addCrewmember(crew: $crew)
        }
      `;
      crew.forEach(c => {
        self.props.client.mutate({
          mutation,
          variables: {
            crew: c
          }
        });
      });
    };
    reader.readAsText(files[0]);
  };
  _editable = evt => {
    this.setState({
      editable: evt.target.checked
    });
  };
  rowGetter = i => {
    const crew = this.props.data.crew || [];
    return crew[i];
  };
  _updateCrew = updateObj => {
    const variables = {
      crew: { ...updateObj.updated, id: updateObj.fromRowId }
    };
    const mutation = gql`
      mutation UpdateCrew($crew: CrewInput) {
        updateCrewmember(crew: $crew)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading) return null;
    //const crew = this.props.data.crew || [];
    //const {editable} = this.state;
    /*const columns = [{
      key: 'firstName',
      name: 'First',
      editable
    },
    {
      key: 'lastName',
      name: 'Start Date',
      editable
    },
    {
      key: 'age',
      name: 'Age',
      editable
    },
    {
      key: 'gender',
      name: 'Sex',
      editable
    },
    {
      key: 'position',
      name: 'Position',
      editable
    },
    {
      key: 'rank',
      name: 'Rank',
      editable
    }]*/

    return (
      <div
        className="crew-core"
        style={{ height: "100%", position: "relative" }}
      >
        <label>
          {" "}<input type="checkbox" onClick={this._editable} /> Editable
        </label>
        <input type="file" onChange={this._importCrew} />
        {/*crew.length > 0 && 
      <ReactDataGrid
      enableCellSelect={true}
      columns={columns}
      rowGetter={this.rowGetter}
      rowsCount={crew.length}
      minHeight={500}
      enableDragAndDrop={false}
      onGridRowsUpdated={this._updateCrew.bind(this)} />
    */}
      </div>
    );
  }
}

const CREW_QUERY = gql`
  query Crew($simulatorId: ID) {
    crew(simulatorId: $simulatorId) {
      id
      firstName
      lastName
      position
      age
      rank
      gender
    }
  }
`;
export default graphql(CREW_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(CrewCore));
