export const DoxPreview = ({ dox }) => (
    <div className="dox-table-preview">
        <span>
            {dox.description.length > 40 ? dox.description.slice(0, 40) + '...' : dox.description}
        </span>
    </div>
)