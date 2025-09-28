import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async newPerson => {
    const res = await axios.post(baseUrl, newPerson)
    return res.data
}

const update = async (id, newPerson) => {
    const res = await axios.put(`${baseUrl}/${id}`, newPerson)
    return res.data
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }