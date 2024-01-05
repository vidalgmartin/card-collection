import CollectionForm from '../components/collection/CollectionForm'
import CollectionDetails from '../components/collection/CollectionDetails'

export default function MyCollections() {

    return (
        <div className="my-collections-page">
            <div className="parent-form-container">
                <CollectionForm />
            </div>
            <div className="parent-collection-container">
                <div className="collection-details-table">
                    <h3>
                        Collection
                    </h3>
                    <h3>
                        Description
                    </h3>
                    <h3>
                        Created On
                    </h3>
                    <h3>
                        Edit
                    </h3>
                </div>
                <CollectionDetails />
            </div>
        </div>
    )
}