import React, {useState} from 'react';

const AddWeight: React.FC = () => {
  const endpoint = "Xxx";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [weight, setWeight] = useState<number>(0);
  const [isMetric, setIsMetric] = useState<boolean>(false);

  const handleNumInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(event.target.value));
  };

  const handlePostRequest = async () => {
    setIsLoading(true);
    let errMsg;

    try{
      const bodyObj = {
        timestamp: new Date().toISOString(),
        data:{
          weight,
          isMetric
        }
      };
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
      });

      setIsSuccess(response.ok)
    } catch(err) {
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }

  const wrapStyle:React.CSSProperties={
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }
  return (
    <div style={wrapStyle}>
      <label>
        Weight
        <input type="number" value={weight} onChange={handleNumInput} />
      </label>
      <button onClick={handlePostRequest} disabled={isLoading}>
        {isLoading ? '...' : 'Submit'}
      </button>
      {isSuccess == null && (<span style={{color:'#bbb'}}>Not submitted</span>)}
      {isSuccess == true && (<span style={{color:'green'}}>OK!</span>)}
      {isSuccess == false && (<span style={{color:'red'}}>Not OK!</span>)}
    </div>
  )
};

// Date().toISOString()

export default AddWeight