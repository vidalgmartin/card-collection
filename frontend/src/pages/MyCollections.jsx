import CollectionForm from '../components/collection/CollectionForm'
import CollectionDetails from '../components/collection/CollectionDetails'

export default function MyCollections() {

    return (
        <div className="my-collections-page">
            <div className="parent-form-container">
                <CollectionForm />
            </div>
            <div className="parent-collection-container">
                <CollectionDetails />
            </div>
        </div>
    )
}