import FormatEth from 'components/FormatEth'
import FormatWEth from 'components/FormatWEth'
import { NextPage } from 'next'

const IndexPage: NextPage = () => (
  <>
    <FormatEth amount={1.349384759384} />
    <FormatWEth amount={3.14} />
  </>
)

export default IndexPage
