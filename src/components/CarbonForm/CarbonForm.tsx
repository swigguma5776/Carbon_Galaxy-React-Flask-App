import React from 'react'; 
import { useDispatch, useSelector, useStore } from 'react-redux'; 
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseURL,
    chooseCarbon,
    chooseEnergy } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface CarbonFormProps{
    id?: string;
    data?: {};
}

interface CarbonState{
    website_url: string;
    carbon_per_webpage: string; 
    green_energy: string;

}

export const CarbonForm = (props:CarbonFormProps) => {
    const dispatch = useDispatch();
    let {carbonData, getData} = useGetData();
    const store = useStore();

    // const websiteURL = useSelector<CarbonState>(state => state.website_url)
    // const lastName = useSelector<CarbonState>(state => state.last_name)

    const { register, handleSubmit } = useForm({})

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if(props.id!){
            const website = data.website_url
            console.log(website)
            const getCarbonData = async(website: string) => {
                const response = await fetch(`https://api.websitecarbon.com/site?url=https%3A%2F%2Fwww.${website}%2F`)
                const data = await response.json()
                return data
            }

            const showCarbonData = async (website: string) => {
                const data = await getCarbonData(website)
                console.log(data)

                console.log(parseFloat((data.statistics.co2.grid.grams).toFixed(2)))
                const bytes = parseFloat((data.statistics.co2.grid.grams).toFixed(2))
        
                console.log(data.green)
                const green = data.green

                const newData = {
                    website_url: website,
                    carbon_per_webpage: bytes,
                    green_energy: green
                }

                console.log(newData)
                await serverCalls.update(props.id!, newData)
                console.log(`Updated: ${website} \n ID: ${props.id}`)
                await window.location.reload();
                await event.target.reset()
            }

            await console.log(showCarbonData(website))

        } else{
            // try API calls from this variable  
            const website = data.website_url
            console.log(website)
           
            const getCarbonData = async(website: string) => {
                const response = await fetch(`https://api.websitecarbon.com/site?url=https%3A%2F%2Fwww.${website}%2F`)
                const data = await response.json()
                return data
            }

            const showCarbonData = async (website: string) => {
                const data = await getCarbonData(website)
                console.log(data)

                await dispatch(chooseURL(website))
                await dispatch(chooseCarbon(parseFloat((data.statistics.co2.grid.grams).toFixed(2))))
                console.log(parseFloat((data.statistics.co2.grid.grams).toFixed(2)))
                console.log(typeof(parseFloat(data.statistics.co2.grid.grams).toFixed(2)))
                await dispatch(chooseEnergy(data.green))
                console.log(data.green)
                console.log(typeof(data.green))
                await serverCalls.create(store.getState());
                await window.location.reload();
                await event.target.reset();
            }

            await console.log(showCarbonData(website))
        }
    }
    
    return(
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="website_url"> Website URL</label>
                    <Input {...register('website_url')} name='website_url' placeholder='instagram.com' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}