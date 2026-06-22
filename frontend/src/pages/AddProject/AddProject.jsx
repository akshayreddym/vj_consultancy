import AddProjectForm from '../../components/AddProjectForm/AddProjectForm';
import './AddProject.css';

function AddProject() {
  return (
    <div className="add-project-page">
      <div className="add-project-page__container">
        <h1 className="add-project-page__title">Add new project</h1>
        <p className="add-project-page__subtitle">
          Log a confirmed client project — it goes live for students immediately.
        </p>
        <AddProjectForm />
      </div>
    </div>
  );
}

export default AddProject;
