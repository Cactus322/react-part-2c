export const SearchField = ({search, handleOnChange}) => {
    return (
        <div>
            <p>find countries</p>
            <input value={search} onChange={handleOnChange}/>
        </div>
    )
}