import Page from 'components/layout'
import Icon from 'components/shared/icon'
import NoResults from 'components/shared/no-results'
import { NextPage } from 'next'

const Custom404: NextPage = () => {
  return (
    <Page title="Error">
      <NoResults
        image={
          <>
            <Icon name="astronaut" size={72} />
            <Icon name="dots" size={72} />
            <Icon name="satellite" size={72} />
          </>
        }
        message="Something went wrong."
      />
    </Page>
  )
}

export default Custom404
